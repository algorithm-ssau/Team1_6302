from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

# Тестовые данные
bicycles = [
    {
        "name": "Горный велосипед MTB Pro",
        "category": "mountain",
        "price": 29999.99,
        "description": "Профессиональный горный велосипед для экстремального катания",
        "image": "/img/road_bikes.jpg",
        "frameSize": "M",
        "inStock": True,
        "rating": 4.8,
        "numReviews": 15
    },
    {
        "name": "Шоссейный велосипед Road Master",
        "category": "road",
        "price": 45999.99,
        "description": "Легкий и быстрый шоссейный велосипед для длительных поездок",
        "image": "/img/road_bike.jpg",
        "frameSize": "L",
        "inStock": True,
        "rating": 4.9,
        "numReviews": 23
    },
    {
        "name": "Городской велосипед City Cruiser",
        "category": "city",
        "price": 19999.99,
        "description": "Удобный городской велосипед для ежедневных поездок",
        "image": "/img/city_bike.jpg",
        "frameSize": "M",
        "inStock": True,
        "rating": 4.5,
        "numReviews": 18
    },
    {
        "name": "Детский велосипед Kids Fun",
        "category": "children",
        "price": 9999.99,
        "description": "Безопасный и яркий велосипед для детей",
        "image": "/img/children_bike.jpg",
        "frameSize": "S",
        "inStock": True,
        "rating": 4.7,
        "numReviews": 12
    }
]

async def seed_database():
    # Подключение к MongoDB
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client.bicycle_shop
    
    # Очистка существующей коллекции
    await db.bicycles.delete_many({})
    
    # Добавление новых данных
    await db.bicycles.insert_many(bicycles)
    
    print("База данных успешно заполнена тестовыми данными!")
    
    # Закрытие соединения
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database()) 