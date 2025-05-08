from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class Category(str, Enum):
    MOUNTAIN = "mountain"
    ROAD = "road"
    CITY = "city"
    CHILDREN = "children"

class FrameSize(str, Enum):
    SMALL = "S"
    MEDIUM = "M"
    LARGE = "L"

class Bicycle(BaseModel):
    name: str
    category: Category
    price: float
    description: str
    image: str
    frameSize: FrameSize
    inStock: bool = True
    rating: float = 0
    numReviews: int = 0
    createdAt: datetime = Field(default_factory=datetime.now)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Mountain Bike Pro",
                "category": "mountain",
                "price": 999.99,
                "description": "Профессиональный горный велосипед",
                "image": "/img/bike1.jpg",
                "frameSize": "M",
                "inStock": True,
                "rating": 4.5,
                "numReviews": 10
            }
        } 