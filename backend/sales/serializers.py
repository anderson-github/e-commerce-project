from rest_framework import serializers
from .models import Products, OrderLines, Orders


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Products
        fields = [
            'id',
            'name',
            'price',
            'type',
            'stock',
        ]


class OrderLineSerializer(serializers.ModelSerializer):

    product_name = serializers.SerializerMethodField()

    class Meta:
        model = OrderLines
        fields = [
            "product_name",
            "quantity",
            "total_price",
        ]

    def get_product_name(self, obj):
        return obj.product.name


class OrderSerializer(serializers.ModelSerializer):

    lines = OrderLineSerializer(many=True)
    client_email = serializers.SerializerMethodField()

    class Meta:
        model = Orders
        fields = [
            "number",
            "sale_date",
            "total_price",
            "client_email",
            "lines",
        ]

    def get_client_email(self, obj):
        return obj.client.email