import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateFrom from "../../../components/forms/ProductCreateFrom";
import {
  getCategories,getCategorySubs,
} from "../../../functions/categories";
import  FileUpload   from "../../../components/forms/FileUpload"
import { LoadingOutlined } from "@ant-design/icons";


const initialState = {
  title: "",
  descriptioin: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};


const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, SetShowSub] = useState(false);
  const [loading,setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({...values,categories:c.data}));


  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };


  const handlecategoryChange = (e) =>{
    // e.preventDefault();
    // console.log("Button clicked",e.target.value);
    // console.log({...values},"fghfgfhfghhdfghdf")
    // setValues({ ...values, subs:[],category: e.target.value },"aaaaaaaaaaaaaaaaa");
        // setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value)
    .then(res=>{


      setSubOptions(res.data);
        setValues({ ...values, subs: [], category: e.target.value });
        console.log("new select",res.data);
    })
    SetShowSub(true)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        {/* {JSON.stringify(values.categories)} */}
        <div className="col-md-10">
        {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product create</h4>
          )}
          {/* <hr /> */}
          <hr />
          {JSON.stringify(values.images)}
          <div className="p-3">
              <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
          </div>
          <ProductCreateFrom handleSubmit={handleSubmit} handleChange={handleChange} values={values} setValues={setValues} handlecategoryChange={handlecategoryChange} subOptions={subOptions} showSub={showSub}/>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
