import React, {useEffect, useState} from 'react';
import axiosClient from "../../configs/axios";
import {vnd} from '../../configs/functions';

const Home = () => {

    const [topSelling, setTopSelling] = useState([]);
    const [recentSales, setRecentSales] = useState([]);
    const [tabSelect, setTabSelect] = useState(1);

    useEffect(() => {
        const getTopSelling = async () => {
            const orders = await axiosClient.get('orders');
            setTopSelling(orders);
        }

        getTopSelling();
    }, []);

    useEffect(() => {
        const getRecentSales = async () => {
            const products = await axiosClient.get('orders');
            setRecentSales(products);
        }

        getRecentSales();
    }, []);

    const countTotal = () => {
        let total = 0;
        recentSales.map(item => {
            if (item.status === 'Giao hàng thành công') total += +item.total
        })
        return total;
    }

    const countCancled = () => {
        let cancled = 0;
        recentSales.map((item,i) => {
            if (item.status === 'Đã hủy') cancled += 1;
        })
        return cancled;
    }

    // useEffect(() => {
    //   const tabs = document.querySelectorAll('.kyle');
    //   tabs.forEach(tab => {
    //     tab.addEventListener('click', () => {
    //       const active = document.querySelector('.rock-active');
    //       active.classList.remove('rock-active');
    //       tab.classList.add('rock-active');
    //     });
    //   });
    // },[]);

    return (
        <div className="home-content">
            <div className="overview-boxes">
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Total Order</div>
                        <div className="number">{recentSales.length}</div>
                        {/*<div className="indicator">*/}
                        {/*  <i className='bx bx-up-arrow-alt'></i>*/}
                        {/*  <span className="text">Up from yesterday</span>*/}
                        {/*</div>*/}
                    </div>
                    <i className='bx bx-cart-alt cart'></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Total Sales</div>
                        <div className="number" style={{fontSize: "28px"}}>{vnd(countTotal())}</div>
                        {/*<div className="indicator">*/}
                        {/*  <i className='bx bx-up-arrow-alt'></i>*/}
                        {/*  <span className="text">Up from yesterday</span>*/}
                        {/*</div>*/}
                    </div>
                    <i className='bx bxs-cart-add cart two'></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Total Profit</div>
                        <div className="number" style={{fontSize: "28px"}}>{vnd(countTotal() + (countTotal() * 10/100))}</div>
                        {/*<div className="indicator">*/}
                        {/*  <i className='bx bx-up-arrow-alt'></i>*/}
                        {/*  <span className="text">Up from yesterday</span>*/}
                        {/*</div>*/}
                    </div>
                    <i className='bx bx-cart cart three'></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Total Return</div>
                        <div className="number">
                            {countCancled()}
                        </div>
                        {/*<div className="indicator">*/}
                        {/*  <i className='bx bx-down-arrow-alt down'></i>*/}
                        {/*  <span className="text">Down From Today</span>*/}
                        {/*</div>*/}
                    </div>
                    <i className='bx bxs-cart-download cart four'></i>
                </div>
            </div>

            <div className="sales-boxes">
                <div className="recent-sales box">
                    <div className={'d-flex'}>
                        <div className={tabSelect === 1 ? "title kyle btn rock-active" : "title kyle btn"}
                             onClick={() => setTabSelect(1)}
                        >Progressing
                        </div>
                        <div className={tabSelect === 2 ? "title kyle btn ms-4 rock-active" : "title kyle btn ms-4"}
                             onClick={() => setTabSelect(2)}>Shipping
                        </div>
                        <div className={tabSelect === 3 ? "title kyle btn ms-4 rock-active" : "title kyle btn ms-4"}
                             onClick={() => setTabSelect(3)}>Successful
                        </div>
                        <div className={tabSelect === 4 ? "title kyle btn ms-4 rock-active" : "title kyle btn ms-4"}
                             onClick={() => setTabSelect(4)}>Cancled
                        </div>
                    </div>
                    <div className="sales-details">
                        <ul className="details">
                            <li className="topic">Date</li>
                            {recentSales.map((product, i) => {
                                const html = <li key={product._id} className={product._id}><span
                                    className={'fs-4'}>{product.createdAt.slice(0, 10)}</span></li>;
                                if (product.status === 'Chờ xử lý' && tabSelect === 1) {
                                    return html;
                                } else if (product.status === 'Đang giao hàng' && tabSelect === 2) {
                                    return html;
                                } else if (product.status === 'Giao hàng thành công' && tabSelect === 3) {
                                    return html;
                                } else if (product.status === 'Đã hủy' && tabSelect === 4) {
                                    return html;
                                }
                            })}
                        </ul>
                        <ul className="details">
                            <li className="topic">Customer</li>
                            {recentSales.map((product, i) => {
                                const html = <li key={product._id} className={product._id}><span
                                    className={'fs-4'}>{product.fullName}</span></li>;
                                if (product.status === 'Chờ xử lý' && tabSelect === 1) {
                                    return html;
                                } else if (product.status === 'Đang giao hàng' && tabSelect === 2) {
                                    return html;
                                } else if (product.status === 'Giao hàng thành công' && tabSelect === 3) {
                                    return html;
                                } else if (product.status === 'Đã hủy' && tabSelect === 4) {
                                    return html;
                                }
                            })}
                        </ul>
                        <ul className="details">
                            <li className="topic">Status</li>
                            {recentSales.map((product, i) => {
                                const html =  <li key={product._id} className={product._id}><span className={'fs-4'}>{product.status}</span>
                                </li>;
                                if (product.status === 'Chờ xử lý' && tabSelect === 1) {
                                    return html;
                                } else if (product.status === 'Đang giao hàng' && tabSelect === 2) {
                                    return html;
                                } else if (product.status === 'Giao hàng thành công' && tabSelect === 3) {
                                    return html;
                                } else if (product.status === 'Đã hủy' && tabSelect === 4) {
                                    return html;
                                }
                            })}
                        </ul>
                        <ul className="details">
                            <li className="topic">Total</li>
                            {recentSales.map((product, i) => {
                                const html = <li key={product._id} className={product._id}><span
                                    className={'fs-4'}>{vnd(+product.total)}</span></li>;
                                if (product.status === 'Chờ xử lý' && tabSelect === 1) {
                                    return html;
                                } else if (product.status === 'Đang giao hàng' && tabSelect === 2) {
                                    return html;
                                } else if (product.status === 'Giao hàng thành công' && tabSelect === 3) {
                                    return html;
                                } else if (product.status === 'Đã hủy' && tabSelect === 4) {
                                    return html;
                                }
                            })}
                        </ul>
                    </div>
                    {/*<div className="button">*/}
                    {/*  <a href="yen">See All</a>*/}
                    {/*</div>*/}
                </div>
                <div className="top-sales box">
                    <div className="title">Recent Sales Product</div>
                    <ul className="top-sales-details">
                        {topSelling.map(order => {
                                return order.products.map(item => {
                                return <li key={item._id}>
                                    <span>
                                        <span className="product">{item.name}</span>
                                    </span>
                                    <span className="price">Sold: {item.quantity}</span>
                                </li>
                            })
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Home;