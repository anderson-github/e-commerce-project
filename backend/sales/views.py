from decimal import Decimal

from django.db import transaction
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Products, OrderLines, Orders
from .serializers import ProductSerializer, OrderSerializer
from .utils import order_number_generator


class ProductsView(APIView):
    def get(self, request, product_id: int = None):

        if product_id:
            try:
                product = Products.objects.get(id=product_id)
                serializer = ProductSerializer(product)
            except Products.DoesNotExist:
                return Response("Product doesn't exist", status=status.HTTP_404_NOT_FOUND)
        else:
            products = Products.objects.all()
            serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)


class OrdersView(APIView):

    class InputSerializer(serializers.Serializer):
        productId = serializers.IntegerField(source="product_id")
        quantity = serializers.IntegerField(min_value=1)

    def get(self, request, order_number: str = None):

        if order_number:
            try:
                order = Orders.objects.get(number=order_number, client=request.user)
                serializer = OrderSerializer(order)
            except Orders.DoesNotExist:
                return Response("Order doesn't exist", status=status.HTTP_404_NOT_FOUND)
        else:
            orders = Orders.objects.filter(client=request.user)
            serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.InputSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)

        lines_data = serializer.validated_data

        with transaction.atomic():

            order = Orders.objects.create(
                number=order_number_generator(),
                client=request.user,
                total_price=Decimal(0),
            )

            total_price_order = Decimal(0)
            lines_to_create = []
            for line in lines_data:
                try:
                    product = Products.objects.get(id=line["product_id"])
                except Products.DoesNotExist:
                    return Response("Product doesn't exist", status=status.HTTP_404_NOT_FOUND)

                total_price = product.price * line["quantity"]

                lines_to_create.append(OrderLines(
                    product=product,
                    quantity=line["quantity"],
                    total_price=total_price,
                    order=order,
                ))
                total_price_order += total_price

            OrderLines.objects.bulk_create(lines_to_create)
            order.total_price = total_price_order
            order.save()

            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)