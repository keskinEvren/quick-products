import axios from 'axios';
import FormData from 'form-data';
// import imageToBase64 from 'image-to-base64';
import {parseStringToArray} from '../../utils/arrayHelpers';
import {convertJSONToQueryString} from '../../utils/objectHelpers';
import {logError, logOutput} from '../../utils/logHelpers';

// TODO: JSDocs
async function sendGetProductsRequest(appKey, formId) {
  const scopes = ['productController', 'sendGetProductsRequest'];
  const endpoint = `https://m-baydogan.jotform.dev/intern-api/product/${appKey}/${formId}`;

  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  try {
    const {data} = await axios.get(endpoint, config);
    const {content, responseCode} = data;
    if (responseCode !== 200) {
      const message = 'Network error: ' + responseCode;
      logError(scopes, message);
      return [];
    }
    if (!Array.isArray(content)) {
      const message = 'No products found.';
      logOutput(scopes, message);
      return [];
    }
    return content;
  } catch (err) {
    logError(scopes, err.message);
  }
}

// TODO: JSdocs
async function sendCreateProductRequest(appKey, formId, product) {
  const scopes = ['productController', 'sendCreateProductRequest'];
  const endpoint = `https://m-baydogan.jotform.dev/intern-api/product/${appKey}/${formId}`;

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  // TODO: Don't forget to parse Image Array
  const products = await sendGetProductsRequest(appKey, formId);
  const {length} = products;
  product.pid = 1000 + length;
  // const product = {
  //   cid: '',
  //   connectedCategories: '[]',
  //   connectedProducts: '[]',
  //   corder: '',
  //   customPrice: '',
  //   customPriceSource: '0',
  //   description: '2112421421213',
  //   fitImageToCanvas: 'Yes',
  //   hasExpandedOption: '',
  //   hasQuantity: '',
  //   hasSpecialPricing: '',
  //   icon: '',
  //   images:
  //     '["https://www.jotform.com/uploads/baydoganmirac/form_files/test1.png","https://www.jotform.com/uploads/baydoganmirac/form_files/Kapak.jpg"]',
  //   isLowStockAlertEnabled: 'No',
  //   isStockControlEnabled: 'No',
  //   lowStockValue: '',
  //   name: 'YENİ ÜRÜN',
  //   options: '[]',
  //   period: 'Monthly',
  //   pid: '1001',
  //   price: '123',
  //   recurringtimes: 'No Limit',
  //   required: '',
  //   selected: '',
  //   setupfee: '',
  //   showSubtotal: '0',
  //   stockQuantityAmount: '',
  //   trial: '',
  // };
  console.log(product);
  products.push(product);
  const productsData = convertJSONToQueryString({
    products: JSON.stringify(products),
  });

  try {
    const {data} = await axios.post(endpoint, productsData, config);
    logOutput(scopes, data);
    const {content, responseCode} = data;
    if (responseCode !== 200) {
      const message = 'Network error: ' + responseCode;
      logError(scopes, message);
      return [];
    }
    return content;
  } catch (err) {
    logError(scopes, err.message);
  }
}

async function sendUpdateProductRequest(appKey, formId, product) {
  const scopes = ['productController', 'sendUpdateProductRequest'];
  const endpoint = `https://m-baydogan.jotform.dev/intern-api/product/${appKey}/${formId}`;

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  // Don't forget to parse Image Array
  const products = await sendGetProductsRequest(appKey, formId);
  // const product = {
  //   cid: '',
  //   connectedCategories: '[]',
  //   connectedProducts: '[]',
  //   corder: '',
  //   customPrice: '',
  //   customPriceSource: '0',
  //   description: '2112421421213',
  //   fitImageToCanvas: 'Yes',
  //   hasExpandedOption: '',
  //   hasQuantity: '',
  //   hasSpecialPricing: '',
  //   icon: '',
  //   images:
  //     '["https://www.jotform.com/uploads/baydoganmirac/form_files/test1.png","https://www.jotform.com/uploads/baydoganmirac/form_files/Kapak.jpg"]',
  //   isLowStockAlertEnabled: 'No',
  //   isStockControlEnabled: 'No',
  //   lowStockValue: '',
  //   name: 'YENİ ÜRÜN',
  //   options: '[]',
  //   period: 'Monthly',
  //   pid: '1001',
  //   price: '123',
  //   recurringtimes: 'No Limit',
  //   required: '',
  //   selected: '',
  //   setupfee: '',
  //   showSubtotal: '0',
  //   stockQuantityAmount: '',
  //   trial: '',
  // };
  const index = product.pid - 1000;
  products[index] = product;
  // TODO: At that night that you added first, they might cause some problems because their id don't start from 1000.

  // ERROR  [ERROR] [formController -> sendGetFormsRequest] API-Limit exceeded
  // ERROR  [ERROR] [formController -> sendGetFormsRequest] Request failed with status code 403
  // ERROR  [ERROR] [productController -> sendGetProductsRequest] Request failed with status code 500
  // No products returned and that causes error too.

  const productsData = convertJSONToQueryString({
    products: JSON.stringify(products),
  });

  try {
    const {data} = await axios.post(endpoint, productsData, config);
    logOutput(scopes, data);
    const {content, responseCode} = data;
    if (responseCode !== 200) {
      const message = 'Network error: ' + responseCode;
      logError(scopes, message);
      return [];
    }
    return content;
  } catch (err) {
    logError(scopes, err.message);
  }
}

async function sendDeleteProductRequest(appKey, formId) {
  const scopes = ['productController', 'sendDeleteProductRequest'];
  // update product -> remove item from array
}

async function sendImageUploadRequest(appKey, formId, productId, imageURI) {
  const scopes = ['productController', 'sendImageUploadRequest'];
  const endpoint = `https://m-baydogan.jotform.dev/intern-api/image/${appKey}/{formId}`;

  const formData = new FormData();
  formData.append('productID', producId);
  formData.append('image', imageURI);

  const config = {
    headers: {
      ...formData.getHeaders(),
    },
  };
  var form = new FormData();
  files.forEach(file => {
    form.append(file.name, file);
  });
  form.append('foo', 'bar');
  axios.post('/api/art', form);

  const {data} = await axios.post(endpoint, data, config);
}

export {
  sendCreateProductRequest,
  sendDeleteProductRequest,
  sendGetProductsRequest,
  sendUpdateProductRequest,
};
