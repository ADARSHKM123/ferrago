import React, { useState, useEffect } from 'react';
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import Mealtem from './MealItem/Mealtem';



function AvailableMeals() {

  const [meals, setMeals] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [httpError, sethttpError] = useState('');

  useEffect(() => {
    const fetchProductdata = async () => {

      const response =await fetch('https://ferrago-latest-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Something went wrong');
      }

      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      } 
      setMeals(loadedMeals);
      setisLoading(false);
    }

       fetchProductdata().catch((err)=>{
        setisLoading(false);
        sethttpError(err.message)
       });

  }, []);

  if(isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }

  if(httpError){
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }

  return <section className={classes.meals}>
    <Card>
      <ul>
        {meals.map(each => <Mealtem key={each.id} id={each.id} name={each.name} description={each.description} price={each.price} />)}
      </ul>
    </Card>
  </section>
}

export default AvailableMeals;
