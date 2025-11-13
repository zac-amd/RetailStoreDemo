from fastapi import FastAPI, Query
from pydantic import BaseModel

app = FastAPI(title="Pricing Service")


@app.get("/pricing/{product_id}")
def get_price(product_id: int, base_price: float = Query(100.0)):
    """Return a computed price for the given product_id.
    Demo logic: even product IDs get 10% discount, odd IDs get 5% discount.
    """
    if product_id % 2 == 0:
        discount = 0.10
    else:
        discount = 0.05
    final_price = base_price * (1 - discount)
    return round(final_price, 2)


@app.get("/health")
def health():
    return {"status": "ok"}
