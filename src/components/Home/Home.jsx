import React from 'react';

const Home = () => {
    return (
        <div className="home-content">
        <div className="overview-boxes">
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Order</div>
              <div className="number">40,876</div>
              <div className="indicator">
                <i className='bx bx-up-arrow-alt'></i>
                <span className="text">Up from yesterday</span>
              </div>
            </div>
            <i className='bx bx-cart-alt cart'></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Sales</div>
              <div className="number">38,876</div>
              <div className="indicator">
                <i className='bx bx-up-arrow-alt'></i>
                <span className="text">Up from yesterday</span>
              </div>
            </div>
            <i className='bx bxs-cart-add cart two' ></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Profit</div>
              <div className="number">$12,876</div>
              <div className="indicator">
                <i className='bx bx-up-arrow-alt'></i>
                <span className="text">Up from yesterday</span>
              </div>
            </div>
            <i className='bx bx-cart cart three' ></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Return</div>
              <div className="number">11,086</div>
              <div className="indicator">
                <i className='bx bx-down-arrow-alt down'></i>
                <span className="text">Down From Today</span>
              </div>
            </div>
            <i className='bx bxs-cart-download cart four' ></i>
          </div>
        </div>
  
        <div className="sales-boxes">
          <div className="recent-sales box">
            <div className="title">Recent Sales</div>
            <div className="sales-details">
              <ul className="details">
                <li className="topic">Date</li>
                <li><a href="yen">02 Jan 2021</a></li>
                <li><a href="yen">02 Jan 2021</a></li>
                <li><a href="yen">02 Jan 2021</a></li>
                <li><a href="yen">02 Jan 2021</a></li>
                <li><a href="yen">02 Jan 2021</a></li>
                <li><a href="yen">02 Jan 2021</a></li>
                <li><a href="yen">02 Jan 2021</a></li>
              </ul>
              <ul className="details">
              <li className="topic">Customer</li>
              <li><a href="yen">Alex Doe</a></li>
              <li><a href="yen">David Mart</a></li>
              <li><a href="yen">Roe Parter</a></li>
              <li><a href="yen">Diana Penty</a></li>
              <li><a href="yen">Martin Paw</a></li>
              <li><a href="yen">Doe Alex</a></li>
              <li><a href="yen">Aiana Lexa</a></li>
              <li><a href="yen">Rexel Mags</a></li>
               <li><a href="yen">Tiana Loths</a></li>
            </ul>
            <ul className="details">
              <li className="topic">Sales</li>
              <li><a href="yen">Delivered</a></li>
              <li><a href="yen">Pending</a></li>
              <li><a href="yen">Returned</a></li>
              <li><a href="yen">Delivered</a></li>
              <li><a href="yen">Pending</a></li>
              <li><a href="yen">Returned</a></li>
              <li><a href="yen">Delivered</a></li>
               <li><a href="yen">Pending</a></li>
              <li><a href="yen">Delivered</a></li>
            </ul>
            <ul className="details">
              <li className="topic">Total</li>
              <li><a href="yen">$204.98</a></li>
              <li><a href="yen">$24.55</a></li>
              <li><a href="yen">$25.88</a></li>
              <li><a href="yen">$170.66</a></li>
              <li><a href="yen">$56.56</a></li>
              <li><a href="yen">$44.95</a></li>
              <li><a href="yen">$67.33</a></li>
               <li><a href="yen">$23.53</a></li>
               <li><a href="yen">$46.52</a></li>
            </ul>
            </div>
            <div className="button">
              <a href="yen">See All</a>
            </div>
          </div>
          <div className="top-sales box">
            <div className="title">Top Seling Product</div>
            <ul className="top-sales-details">
              <li>
              <a href="yen">
                <span className="product">Vuitton Sunglasses</span>
              </a>
              <span className="price">$1107</span>
            </li>
            <li>
              <a href="yen">
                <span className="product">Hourglass Jeans </span>
              </a>
              <span className="price">$1567</span>
            </li>
            <li>
              <a href="yen">
                <span className="product">Nike Sport Shoe</span>
              </a>
              <span className="price">$1234</span>
            </li>
            <li>
              <a href="yen">
                <span className="product">Hermes Silk Scarves.</span>
              </a>
              <span className="price">$2312</span>
            </li>
            <li>
              <a href="yen">
                <span className="product">Succi Ladies Bag</span>
              </a>
              <span className="price">$1456</span>
            </li>
            <li>
              <a href="yen">
                <span className="product">Gucci Womens's Bags</span>
              </a>
              <span className="price">$2345</span>
              </li>
            <li>
              <a href="yen">
                <span className="product">Addidas Running Shoe</span>
              </a>
              <span className="price">$2345</span>
            </li>
            <li>
              <a href="yen">
                <span className="product">Bilack Wear's Shirt</span>
              </a>
              <span className="price">$1245</span>
            </li>
            </ul>
          </div>
        </div>
      </div>
    );
}
export default Home;