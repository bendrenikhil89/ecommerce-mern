import React, {useState, useEffect} from 'react';
import AdminNav from '../../components/Navbar/AdminNav';
import {getProductsByCount} from '../../utils/product';
import AdminProductCard from "../../components/Cards/AdminProductCard";
import AllProducts from '../../pages/admin/product/AllProduct'

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Admin Dashboard</h4>
          )}
          <div className="row">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;