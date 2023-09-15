get mealTypes with  http://localhost:8900/quickSearch

get restaurant data with respect to city id http://localhost:8900/restaurant?city_id=1

get restaurant data with respect to meal id http://localhost:8900/restaurant?meal_id=1

get restaurant data with respect to city id and meal_id http://localhost:8900/restaurant?city_id=1&meal_id=1

get locations  http://localhost:8900/locations 

get restaurant detail wrt restaurant_id http://localhost:8900/details/restaurant/1 

get menu details wrt restaurant_id http://localhost:8900/menu/1


get restaurant data with respect to cuisine with out sorting http://localhost:8900/filter/:mealid?cuisine_id=1,2,3


get restaurant data with respect to cuisine with sorting http://localhost:8900/filter/:mealid?cuisine_id=1&sort=-1

get restaurant data with respect to cost range with out sorting http://localhost:8900/filter/:mealid?lcost=100&hcost=500

get restaurant data with respect to cost range with sorting http://localhost:8900/filter/:mealid?lcost=100&hcost=500&sort=1 

get sorted from low to high price  restaurant data http://localhost:8900/filter/:mealid?sort=1 

get sorted from high to low price  restaurant data http://localhost:8900/filter/:mealid?sort=-1 


get pagination menu data http://localhost:8900/menu?page=1&per_page=10

post orders http://localhost:8900/orders 
get all orders http://localhost:8900/orders 
get one order by orderId http://localhost:8900/orders/:order_id 
delete by orderId http://localhost:8900/orders/:order_id 
update cost,menuItems http://localhost:8900/orders/:order_id?cost=900?menuId=[23,33,22]
