from django.urls import path
from sales import views


urlpatterns = [
    path('products/', views.ProductsView.as_view(), name='product-list'),
    path('products/<int:product_id>/', views.ProductsView.as_view(), name='product-detail'),
    path('orders/', views.OrdersView.as_view(), name='order-list'),
    path('orders/<int:order_id>/', views.OrdersView.as_view(), name='order-detail'),
]
