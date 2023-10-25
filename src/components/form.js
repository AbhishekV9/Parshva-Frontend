import axios from "axios";
import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./common.css";

const Form = () => {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [productOrders, setProductOrders] = useState([]);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [workedHours, setWorkedHours] = useState(null);
  const [ratePerHours, setRatePerHours] = useState(null);
  const [supplierName, setSupplierName] = useState("");
  const [purchaseOrder, setPurchaseOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSuppliers = async () => {
    try {
      const suppliers = await axios.get(
        "https://parshva-screening-backend.onrender.com/suplliers"
      );
      setSuppliers(suppliers?.data);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const getProductOrders = async (selectedSupplier) => {
    try {
      const productOrders = await axios.get(
        `https://parshva-screening-backend.onrender.com/productOrders/${selectedSupplier}`
      );
      setSupplierName(selectedSupplier);
      setProductOrders(productOrders?.data);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: {
          name,
          startTime: startTime ? `${startTime?.$H}:${startTime?.$m}` : null,
          endTime: endTime ? `${endTime?.$H}:${endTime?.$m}` : null,
          workedHours: parseInt(workedHours),
          ratePerHours: parseInt(ratePerHours),
          supplierName,
          purchaseOrder,
        },
        url: "https://parshva-screening-backend.onrender.com/createDocket",
      };
      const response = await axios(options);
      toast.success("Docket created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <>
      <div>
        <form>
          <div className="formIp">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{ width: "55ch" }}
              value={name}
              onChange={(e) => setName(e?.target?.value)}
              required
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="formIp">
              <TimeField
                sx={{ width: "55ch" }}
                id="outlined-basic"
                label="Start time"
                variant="outlined"
                format="hh:mm a"
                required
                value={startTime}
                onChange={(newValue) => {
                  const a = newValue ? `${newValue?.$H}:${newValue?.$m}` : null;
                  setStartTime(newValue);
                }}
              />
            </div>
            <div className="formIp">
              <TimeField
                sx={{ width: "55ch" }}
                id="outlined-basic"
                label="End Time"
                variant="outlined"
                format="hh:mm a"
                required
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
              />
            </div>
          </LocalizationProvider>

          <div className="formIp">
            <TextField
              sx={{ width: "55ch" }}
              id="outlined-basic"
              label="No. of hours worked"
              variant="outlined"
              type="number"
              required
              value={workedHours}
              onChange={(e) => setWorkedHours(e?.target?.value)}
            />
          </div>
          <div className="formIp">
            <TextField
              sx={{ width: "55ch" }}
              id="outlined-basic"
              label="Rate Per hour"
              variant="outlined"
              type="number"
              required
              value={ratePerHours}
              onChange={(e) => setRatePerHours(e?.target?.value)}
            />
          </div>
          <div className="formIp">
            <TextField
              id="outlined-basic"
              label="Supplier Name"
              variant="outlined"
              sx={{ width: "55ch" }}
              select
              onChange={(e) => getProductOrders(e.target.value)}
              value={supplierName}
            >
              {suppliers?.map((option, index) => (
                <MenuItem key={index} value={option._id}>
                  {option.supplierName}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="formIp">
            <TextField
              id="outlined-basic"
              label="Purchase Order"
              variant="outlined"
              sx={{ width: "55ch" }}
              select
              required
              value={purchaseOrder}
              onChange={(e) => setPurchaseOrder(e.target.value)}
            >
              {productOrders?.map((product, index) => (
                <MenuItem key={index} value={product._id}>
                  <div>
                    <div>
                      <b>PO Number:&nbsp;&nbsp;</b>
                      {product?.orderNumber}
                    </div>
                    <div>
                      <b>Description:&nbsp;&nbsp;</b>
                      {product?.description}
                    </div>
                  </div>
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div
            className="formIp"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              onClick={handleFormSubmit}
              laoding={isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  size={20}
                  style={{ marginRight: 5, color: "white" }}
                />
              ) : null}
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
