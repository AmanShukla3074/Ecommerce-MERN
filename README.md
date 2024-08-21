# E-Shop

E-Shop is an E-commerce Website that provides a seamless shopping experience for a wide range of clothing products. With a user-friendly interface and a robust backend, E-Shop makes it easy for customers to browse, select, filter and purchase their favorite items.

## Live Demo

[Live Demo](https://eshop-aman.vercel.app/)

### Note on Performance

⚠️ **Important Notice:**

Please be aware that the **API response time might be slow**, and product rendering may take a few seconds. This is because the backend is hosted on Render's free tier, which may introduce latency, especially when the server is waking up from an idle state.

**Reason for Slow API Response:**
- The backend of this project is deployed on [Render](https://render.com/) using the free tier. Free-tier services typically experience increased latency due to limited resources and the possibility of the server going into a "sleep" mode when not in use. When the server is accessed after being idle, it takes some time to wake up, leading to slower API responses.

## Features

* **User Authentication:** Secure sign-up and login functionality with OTP verification.

* **Product Catalog:** Browse a wide selection of clothing items, filter by size, color, and price.

* **Shopping Cart:** Add items to the cart, update quantities, and view the total price.

* **Order Management:** Place orders, view order summaries, and track order history.

* **Payment Integration:** Secure payment gateway integration using Razorpay.

* **Responsive Design:** Optimized for all devices, including desktops, tablets, and mobile phones.


## Technologies Used

* **Frontend:** React, Redux

* **Backend:** Node.js, Express.js

* **Database:** MongoDB

* **Authentication:** JWT

* **Payment Gateway**: Razorpay

* **Deployment:** Vercel (Frontend), Render (Backend)


## Screenshots/Sreen Layouts

### Desktop

| ![Screenshot 2024-08-21 154020](https://github.com/user-attachments/assets/124db883-e6aa-449c-bfa1-42ead24a7d5e) | ![Screenshot 2024-08-21 154202](https://github.com/user-attachments/assets/20451402-c1ad-46c8-bdac-9574fac569f6) |
|:---:|:---:|
| Registration 1 | Registration Validation |
| ![Screenshot 2024-08-21 154333](https://github.com/user-attachments/assets/537e0a60-e132-4de6-a9cf-b32df5b62390) | ![Screenshot 2024-08-21 154530](https://github.com/user-attachments/assets/f368bd55-43c0-4d68-ba12-8bada673f291) |
| Registration OTP | OTP in Email |
| ![Screenshot 2024-08-21 154743](https://github.com/user-attachments/assets/b187b98b-876b-472c-9285-6ff6112f166b) | ![Screenshot 2024-08-21 154816](https://github.com/user-attachments/assets/162a5ee0-589b-4add-ac50-0f79df0c471c) |
| Login | Login Wrong Password |
| ![Screenshot 2024-08-21 154828](https://github.com/user-attachments/assets/6589427b-121c-41b1-bc55-bf0fbb5c8d47) | ![Screenshot 2024-08-21 155013](https://github.com/user-attachments/assets/93023f0f-57a4-463d-a8e8-f33d5c487896) |
| Login OTP | Home |
| ![Screenshot 2024-08-21 155021](https://github.com/user-attachments/assets/496e6ceb-c293-4b6d-b7a0-36f533ddb06c) | ![Screenshot 2024-08-21 155224](https://github.com/user-attachments/assets/fdc6346a-7388-4129-95a2-d78da4dd659d) |
| Home | Navbar Dropdown |
| ![Screenshot 2024-08-21 155541](https://github.com/user-attachments/assets/e9afaf15-e546-48c8-bb29-b17d02b744b8) | ![Screenshot 2024-08-21 155643](https://github.com/user-attachments/assets/52270656-9010-49ab-beaa-6da5f8c79edf) |
| Categories/Search Product | Filters |
| ![Screenshot 2024-08-21 155658](https://github.com/user-attachments/assets/95ff80f8-162a-4f99-9a45-56088b6fadbd) | ![Screenshot 2024-08-21 155802](https://github.com/user-attachments/assets/45202e37-89bb-4414-ab3b-68d50a17584d) |
| Product Details 1 | Product Details 2 |
| ![Screenshot 2024-08-21 155814](https://github.com/user-attachments/assets/5927992b-e03f-4859-9c4c-357aec19f393) | ![Screenshot 2024-08-21 155843](https://github.com/user-attachments/assets/f938460c-7d24-474c-8ad0-802b46519426) |
| Add To Cart | Cart |

#### Payment

| ![Screenshot 2024-08-21 160431](https://github.com/user-attachments/assets/c38ab6ca-55e0-42dd-879c-33642e300f9d) | ![Screenshot 2024-08-21 160458](https://github.com/user-attachments/assets/aeaf9d66-8f2c-4361-a51a-0a157855d31f) |
|:---:|:---:|
| Address | Add Address |
| ![Screenshot 2024-08-21 160510](https://github.com/user-attachments/assets/dd36dd72-7dee-4eff-91f3-3bd8aea86cd9) | ![Screenshot 2024-08-21 160522](https://github.com/user-attachments/assets/b916301b-cab5-4215-93d5-f25bad9295bd) |
| Select Address | Order Summary |
| ![Screenshot 2024-08-21 160541](https://github.com/user-attachments/assets/14b465f6-826e-40a1-80f6-608afab7f46d) | ![Screenshot 2024-08-21 160600](https://github.com/user-attachments/assets/12fb3055-34d7-4f79-83f7-7625b874e157) |
| Razorpay 1 | Razorpay 2 |
| ![Screenshot 2024-08-21 160615](https://github.com/user-attachments/assets/3a7e534a-f5d0-49ac-acca-0e6e14131e11) | ![Screenshot 2024-08-21 160628](https://github.com/user-attachments/assets/eae0989d-d7ec-4ea6-86b7-419a2069f64c) |
| Razorpay 3 | Payment Success |

#### Order

| ![Screenshot 2024-08-21 160734](https://github.com/user-attachments/assets/8feda49d-1adb-413a-9724-1d3d6f3103e4) | ![Screenshot 2024-08-21 160743](https://github.com/user-attachments/assets/0a28a868-c2ed-4dde-b024-f2eb72096d69) |
|:---:|:---:|
| Order List | Order Details |
| ![Screenshot 2024-08-21 160755](https://github.com/user-attachments/assets/28742360-a223-4aa8-b0ec-b48622ab99dc) | ![Screenshot 2024-08-21 160813](https://github.com/user-attachments/assets/e32c00e1-02cf-453c-9aea-ca624c6d1ea8) |
| Order Details | Rate and Review Ordered Product |


### Tablet
| ![Screenshot 2024-08-21 165327](https://github.com/user-attachments/assets/2d7e6470-8c04-49e9-9fed-be1da0b760a7) | ![Screenshot 2024-08-21 165421](https://github.com/user-attachments/assets/00534a19-16b4-41ca-845f-25a239c47e4b) | ![Screenshot 2024-08-21 165455](https://github.com/user-attachments/assets/dfb31ff3-6951-4f34-8ec5-9ba70229891e) |
|:---:|:---:|:---:|
| Registration | Login | OTP |
| ![Screenshot 2024-08-21 165557](https://github.com/user-attachments/assets/1d469f51-cb15-4296-8529-38ece823f63c) | ![Screenshot 2024-08-21 165625](https://github.com/user-attachments/assets/aa6256dc-5256-49fd-ab5c-927d6bd76900) | ![Screenshot 2024-08-21 165642](https://github.com/user-attachments/assets/338f3619-fc62-4145-a993-8a2d573ab289) |
| Home | Product Details | Cart |


#### Payment

| ![Screenshot 2024-08-21 223134](https://github.com/user-attachments/assets/0479dfe5-9136-48a7-bd16-e8221436ff63) | ![Screenshot 2024-08-21 223143](https://github.com/user-attachments/assets/99cb15e2-a5d4-4355-8653-4d8a9d09d2af) | ![Screenshot 2024-08-21 223153](https://github.com/user-attachments/assets/50e96321-e5e2-4742-9282-8b9faa9dec5d) |
|:---:|:---:|:---:|
| Add Address | Select Address | Order Summary |
| ![Screenshot 2024-08-21 223214](https://github.com/user-attachments/assets/d7f04536-501c-4c85-b392-9d74a7efa942) | ![Screenshot 2024-08-21 223240](https://github.com/user-attachments/assets/aedcb34e-7f83-4597-b50c-85b8624d4696) |  
| Razorpay 1 | Razorpay 2 |

#### Order

| ![Screenshot 2024-08-21 223914](https://github.com/user-attachments/assets/06ae01a9-4ca4-4fdf-837e-039a950ecdf3) | ![Screenshot 2024-08-21 223935](https://github.com/user-attachments/assets/e5888d84-47d3-4c8c-a364-787d04ec77e8) | ![Screenshot 2024-08-21 223943](https://github.com/user-attachments/assets/8de520f8-c61b-4f5d-813d-1521e3db995b) |
|:---:|:---:|:---:|
| Image 1 | Image 2 | Image 3 |
| ![Screenshot 2024-08-21 223958](https://github.com/user-attachments/assets/54d98eb1-f6fb-4a5e-b643-cbb9f7e13755) | ![Screenshot 2024-08-21 224011](https://github.com/user-attachments/assets/c150c601-1d37-442b-be56-1600284e77d0) | |
| Image 4 | Image 5 |  |
