import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/lib/upload";
import { FormikProvider, useFormik } from "formik";
import { FC, Fragment, useState } from "react";
import { Product } from "../../features/products/productsSlice";

import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

type ProductFormProps = {
  buttonLabel: string;
  initialValues: Product;
  image: string;
  handler: (values: Product, imageUrl: string) => void;
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    alert("You can only upload JPG/PNG file!");
  }
  return isJpgOrPng;
};

const ProductForm: FC<ProductFormProps> = ({
  buttonLabel,
  initialValues,
  image,
  handler,
}) => {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState<string>(image);

  const handleImageChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImageUrl(url);
      });
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      handler(values, imageUrl);
    },
  });

  const { values, handleSubmit, handleChange } = formik;
  const {
    name,
    description,
    boughtPrice,
    salesPrice,
    quantity,
    code,
    category,
  } = values;

  const isValidImage = imageUrl
    ? imageUrl.includes("jpeg") ||
      imageUrl.includes("jpg") ||
      imageUrl.includes("png")
    : true;

  const isValid =
    Boolean(name) &&
    Number(name?.length) <= 50 &&
    Number(description?.length) <= 2000 &&
    isValidImage &&
    Boolean(boughtPrice) &&
    !isNaN(boughtPrice) &&
    boughtPrice > 0 &&
    Boolean(salesPrice) &&
    !isNaN(salesPrice) &&
    salesPrice > 0 &&
    !isNaN(quantity) &&
    quantity >= 0 &&
    Boolean(code);

  return (
    <Fragment>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              error={!(Boolean(name) && Number(name?.length) <= 50)}
              name="name"
              label="Product Name"
              variant="outlined"
              value={name}
              helperText={
                !(Boolean(name) && Number(name?.length) <= 50) && "Error"
              }
              onChange={handleChange}
            />
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              error={!(Number(description?.length) <= 2000)}
              name="description"
              multiline
              maxRows={4}
              label="Product Description"
              variant="outlined"
              value={description}
              helperText={!(Number(description?.length) <= 2000) && "Error"}
              onChange={handleChange}
            />
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleImageChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <AddIcon />
              )}
            </Upload>
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              error={
                !(
                  Boolean(boughtPrice) &&
                  !isNaN(boughtPrice) &&
                  boughtPrice > 0
                )
              }
              name="boughtPrice"
              label="Bought Price"
              variant="outlined"
              value={boughtPrice}
              helperText={
                !(
                  Boolean(boughtPrice) &&
                  !isNaN(boughtPrice) &&
                  boughtPrice > 0
                ) && "Error"
              }
              onChange={handleChange}
            />
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              error={
                !(Boolean(salesPrice) && !isNaN(salesPrice) && salesPrice > 0)
              }
              name="salesPrice"
              label="Sales Price"
              variant="outlined"
              value={salesPrice}
              helperText={
                !(
                  Boolean(salesPrice) &&
                  !isNaN(salesPrice) &&
                  salesPrice > 0
                ) && "Error"
              }
              onChange={handleChange}
            />
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              error={!(!isNaN(quantity) && quantity >= 0)}
              name="quantity"
              label="Quantity"
              variant="outlined"
              value={quantity}
              helperText={!(!isNaN(quantity) && quantity >= 0) && "Error"}
              onChange={handleChange}
            />
            <Select
              sx={{ mt: 3 }}
              fullWidth
              name="category"
              displayEmpty
              label="Category"
              value={category}
              onChange={handleChange}
            >
              <MenuItem value={1}>Food</MenuItem>
              <MenuItem value={2}>Stationery</MenuItem>
              <MenuItem value={3}>Construction</MenuItem>
            </Select>
            {buttonLabel !== "Save" && (
              <TextField
                sx={{ mt: 3 }}
                error={!Boolean(code)}
                name="code"
                label="Code"
                variant="outlined"
                value={code}
                helperText={!Boolean(code) && "Error"}
                onChange={handleChange}
              />
            )}

            <Box mt={5}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={!isValid}
              >
                {buttonLabel}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={() => navigate("/warehouse")}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </FormikProvider>
    </Fragment>
  );
};

export default ProductForm;
