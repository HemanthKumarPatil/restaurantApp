import './index.css'

const DishCategory = props => {
  const {menuData, isActiveTab, onChangeTabId} = props
  const {menuCategory, menuCategoryId} = menuData
  const activeClass = isActiveTab ? 'active-tab-text' : null
  const onTabClick = () => {
    onChangeTabId(menuCategoryId)
  }
  return (
    <li className="menu-item">
      <button
        onClick={onTabClick}
        className={`tab-btn ${activeClass}`}
        type="button"
      >
        <p className="tab-name">{menuCategory}</p>
      </button>
    </li>
  )
}

export default DishCategory
