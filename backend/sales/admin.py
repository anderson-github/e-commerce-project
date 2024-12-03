from django.contrib import admin
from .models import Products, Orders, OrderLines


class ProductsAdmin(admin.ModelAdmin):
    model = Products
    list_display = [
        "id",
        "name",
        "price",
        "type",
        "stock",
    ]


class OrderLinesAdmin(admin.StackedInline):
    model = OrderLines
    extra = 0


class OrdersAdmin(admin.ModelAdmin):
    model = Orders
    list_display = [
        "number",
        # "client__email",
        "total_price",
    ]

    inlines = [OrderLinesAdmin]


admin.site.register(Products, ProductsAdmin)
admin.site.register(Orders, OrdersAdmin)
