import './index.css'

import Loader from 'react-loader-spinner'

import {Component} from 'react'

import Header from '../Header'

import DishCategory from '../DishCategory'

import DishItem from '../DishItem'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class Home extends Component {
  state = {
    status: diffStates.inProgress,
    activeTabId: '11',
    data: [],
    count: 0,
  }

  onChangeActiveTab = id => {
    this.setState({activeTabId: id})
  }

  componentDidMount = async () => {
    try {
      const response = await fetch(
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
      )
      const dataResponse = await response.json()

      this.setState({status: diffStates.success, data: dataResponse})
    } catch (error) {
      this.setState({status: diffStates.fail})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onIncrease = () => {
    this.setState(prev => ({count: prev.count + 1}))
  }

  onDecrease = () => {
    const {count} = this.state
    if (count === 0) {
      this.setState({count: 0})
    } else {
      this.setState(prev => ({count: prev.count - 1}))
    }
  }

  renderSuccessView = () => {
    const {data, activeTabId, count} = this.state
    const tableMenuData = data[0].table_menu_list
    const currentActiveTabDishes = tableMenuData.filter(
      each => each.menu_category_id === activeTabId,
    )
    const updatedTableMenuData = tableMenuData.map(each => ({
      categoryDishes: each.category_dishes,
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
    }))
    const updatedActiveTabDishes = {
      categoryDishes: currentActiveTabDishes[0].category_dishes,
      menuCategory: currentActiveTabDishes[0].menu_category,
      menuCategoryId: currentActiveTabDishes[0].menu_category_id,
    }

    const dishesArray = updatedActiveTabDishes.categoryDishes
    const updatedDishesArray = dishesArray.map(dish => ({
      addonCat: dish.addonCat,
      dishAvailability: dish.dish_Availability,
      dishCalories: dish.dish_calories,
      dishCurrency: dish.dish_currency,
      dishDescription: dish.dish_description,
      dishId: dish.dish_id,
      dishImage: dish.dish_image,
      dishName: dish.dish_name,
      dishPrice: dish.dish_price,
    }))

    return (
      <>
        <Header count={count} />
        <div className="dish-item-category-div">
          <ul className="tabs-container">
            {updatedTableMenuData.map(each => (
              <DishCategory
                key={each.menuCategoryId}
                isActiveTab={each.menuCategoryId === activeTabId}
                menuData={each}
                onChangeTabId={this.onChangeActiveTab}
              />
            ))}
          </ul>
        </div>
        <ul className="dish-items-containers">
          {updatedDishesArray.map(each => (
            <DishItem
              count={count}
              dish={each}
              key={each.dishId}
              onIncreaseCount={this.onIncrease}
              onDecreaseCount={this.onDecrease}
            />
          ))}
        </ul>
      </>
    )
  }

  renderDiffViews = () => {
    const {status} = this.state
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderSuccessView()
      case diffStates.fail:
        return <h1 className="failure-mesg">Failed To Load...</h1>
      default:
        return null
    }
  }

  render() {
    return <div className="home-main-container">{this.renderDiffViews()}</div>
  }
}

export default Home
