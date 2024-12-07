from django.db import models
from clients.models import Client


# Create your models here.
class Products(models.Model):
    """
    Products Model to manage type and info about products db.
    """
    name = models.CharField(max_length=100, null=False, verbose_name="Product Name")
    price = models.DecimalField(decimal_places=2, verbose_name="Product Price", max_digits=10)
    description = models.TextField(verbose_name="Product Description")
    # image = models.URLField(verbose_name="Product Image")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Product Created")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Product Updated")

    def __str__(self):
        return self.name


class Orders(models.Model):
    """
    Orders Model to manage type and info about orders db.
    """

    number = models.CharField(max_length=100, null=False, verbose_name="Order Number")
    sale_date = models.DateTimeField(verbose_name="Sale Date", auto_now=True)
    total_price = models.DecimalField(decimal_places=2, verbose_name="Total Price", max_digits=10)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, verbose_name="Client")


class OrderLines(models.Model):
    """
    Order Lines Model to manage type and info about order lines db.
    """

    product = models.ForeignKey(Products, on_delete=models.CASCADE, verbose_name="Product")
    quantity = models.IntegerField(verbose_name="Quantity")
    total_price = models.DecimalField(decimal_places=2, verbose_name="Total Price", max_digits=10)
    order = models.ForeignKey(Orders, on_delete=models.CASCADE, verbose_name="Order", related_name="lines")