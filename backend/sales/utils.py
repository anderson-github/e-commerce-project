import string
import random


def order_number_generator(size: int = 10, chars: str = string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))