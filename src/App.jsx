import Home from './Component/Home.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Category from './Component/Category.jsx'
import LiveA from './Component/LiveA.jsx'
import Portfolio from './Component/Portfolio.jsx'
import Footer from './Component/Footer.jsx'
import Testimonial from './Component/Testimonial.jsx'
import NavBar from './Component/NavBar.jsx'
import Login from './pages/Login.jsx'
import Form from './pages/Form.jsx'
import About from './pages/About.jsx'
import CreateAuction from './pages/CreateAuction.jsx'
import Contact from './pages/Contact.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import Detail from './pages/Detail.jsx';
import UserDashboard from './pages/UserDashboard/UserDashboard.jsx';
import Profile from './pages/UserDashboard/Profile.jsx';
import Bids from './pages/UserDashboard/Bids.jsx';
import Settings from './pages/UserDashboard/Settings.jsx';
import Stats from './pages/AdminDashboard/Stats.jsx';
import UserTable from './pages/UserTable.jsx';
import Payment from './pages/Payment.jsx';
import UserDetails from './pages/UserDetails.jsx';
import ItemTable from './pages/ItemTable.jsx'
import ItemDetails from './pages/ItemDetails';
import ItemListing from './pages/ItemListing';
import Explore from './pages/Explore.jsx';
import { ToastContainer } from 'react-toastify';
import EmailVerificationPage from './pages/EmailVerificationPage.jsx';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard/SellerDashboard';
import MyAuctions from './pages/SellerDashboard/MyAuctions';
import Users from './pages/AdminDashboard/Users';
import Auctions from './pages/AdminDashboard/Auctions';
import ProtectedRoute from './components/ProtectedRoute';
import MyBids from "./pages/MyBids";

function App() {
  return (
    <>  
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<NavBar />} >
              <Route index element={<><Home /> 
                <Category />
                <LiveA />
                <Portfolio />
                <Testimonial />
                <Footer />
              </>}/>
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/About" element={<About />} />
              <Route path="/Form" element={<Form />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Detail" element={<Detail />} />
              <Route path="/Explore" element={<Explore />} />
              <Route path="/EmailVerificationPage" element={<EmailVerificationPage />} />
              <Route path="/items" element={<ItemListing />} />
              <Route path="/items/:id" element={<ItemDetails />} />
              <Route path="/my-bids" element={<MyBids />} />
              <Route path="/admin" element={<AdminDashboard />} />

              {/* User Routes */}
              <Route path="/user/*" element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserDashboard />
                </ProtectedRoute>
              }>
                <Route path="dashboard/profile" element={<Profile />} />
                <Route path="dashboard/bids" element={<Bids />} />
                <Route path="dashboard/settings" element={<Settings />} />
              </Route>

              {/* Seller Routes */}
              <Route path="/seller/*" element={
                <ProtectedRoute allowedRoles={['seller']}>
                  <SellerDashboard />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<MyAuctions />} />
                <Route path="create" element={<CreateAuction />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/*" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<Stats />} />
                <Route path="users" element={<Users />} />
                <Route path="auctions" element={<Auctions />} />
              </Route>

              {/* Protected Routes */}
              <Route path="/UserDetails/:id" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserDetails />
                </ProtectedRoute>
              } />
              <Route path="/ItemTable" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ItemTable />
                </ProtectedRoute>
              } />
              <Route path="/ItemListing" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ItemListing />
                </ProtectedRoute>
              } />
              <Route path="/Payment" element={
                <ProtectedRoute allowedRoles={['user']}>
                  <Payment />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
