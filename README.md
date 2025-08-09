# SmartPlugBD E-commerce Website

A complete e-commerce website built with HTML, CSS, JavaScript, and Bootstrap 5. Features dual currency support (USD/BDT), admin panel, user dashboard, and mobile-responsive design.

## 🌟 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Dual Currency Support**: USD and BDT with configurable exchange rates
- **Product Catalog**: Grid layout with search, filtering, and categories
- **Shopping Cart**: Add to cart, quantity management, and checkout
- **Wishlist**: Save favorite products for later
- **User Authentication**: Login/logout functionality
- **Order Tracking**: Complete order management system

### Admin Panel
- **Product Management**: Add, edit, delete products
- **Category Management**: Organize products by categories
- **Order Management**: Track and update order status
- **Slider Management**: Control homepage image carousel
- **Settings**: Configure site settings, payment methods, and currency
- **Payment Gateway Settings**: Manage bKash, Nagad, and bank transfer details

### User Dashboard
- **Profile Management**: Update personal information
- **Order History**: View past orders and tracking
- **Address Book**: Manage multiple delivery addresses
- **Wishlist Management**: View and manage saved products
- **Reviews & Ratings**: Write and manage product reviews
- **Account Settings**: Privacy and notification preferences

## 🚀 Live Demo

1. **Homepage**: `index.html`
2. **Admin Panel**: `Admin/index.html`
3. **User Dashboard**: `User/dashboard.html`

## 💰 Payment Integration

- **bKash**: Mobile financial service
- **Nagad**: Digital payment platform
- **Bank Transfer**: Traditional banking option
- **Configurable**: All payment details manageable through admin panel

## 🌍 Dual Currency System

- **Exchange Rate**: BDT = USD × (Global Rate + 1 Taka)
- **Default Rate**: 120 BDT = 1 USD
- **Toggle Feature**: Users can switch between BDT-first or USD-first display
- **Admin Configurable**: Exchange rates and currency settings

## 📱 Mobile Features

- **Responsive Navigation**: 3-dot menu for mobile devices
- **Touch-Friendly**: Optimized for mobile interactions
- **Product Grid**: 2 products per row on mobile, 3 on desktop
- **Mobile Cart**: Optimized shopping cart experience

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.0
- **Icons**: Font Awesome 6.0.0
- **Storage**: LocalStorage for data persistence
- **Responsive**: Mobile-first design approach

## 📁 Project Structure

```
SmartPlugBD/
├── index.html                 # Homepage
├── Admin/
│   └── index.html            # Admin panel
├── User/
│   └── dashboard.html        # User dashboard
├── assets/
│   ├── css/
│   │   ├── style.css         # Main styles
│   │   ├── admin.css         # Admin panel styles
│   │   └── user.css          # User dashboard styles
│   └── js/
│       ├── main.js           # Main application logic
│       ├── admin.js          # Admin panel functionality
│       └── user.js           # User dashboard functionality
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smartplugbd.git
   cd smartplugbd
   ```

2. **Start a local server** (optional)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   - Navigate to `http://localhost:8000` (if using local server)
   - Or open `index.html` directly in your browser

## 📋 Usage

### For Customers
1. Browse products on the homepage
2. Use search and category filters
3. Add products to cart or wishlist
4. Create account and manage profile
5. Place orders with multiple payment options
6. Track order status in user dashboard

### For Administrators
1. Access admin panel at `/Admin/index.html`
2. Manage products, categories, and orders
3. Configure payment settings and exchange rates
4. Update site settings and slider images
5. Monitor sales and customer activity

## 🔧 Configuration

### Currency Settings
- Access admin panel → Settings
- Update USD to BDT exchange rate
- Toggle dual currency display
- Set primary currency preference

### Payment Gateway Setup
- Access admin panel → Payment Settings
- Configure bKash and Nagad numbers
- Set bank account details
- All settings are hidden from customers

### Site Customization
- Update site name and contact information
- Configure WhatsApp integration
- Set shipping costs and tax rates
- Manage slider images and content

## 📊 Data Storage

The application uses browser LocalStorage for data persistence:
- **Products**: Product catalog and inventory
- **Orders**: Customer orders and status
- **Users**: User profiles and preferences
- **Settings**: Admin configurations

*Note: For production use, integrate with a backend database system.*

## 🔒 Security Features

- Input validation and sanitization
- XSS protection measures
- Secure payment form handling
- Admin access controls
- Data encryption for sensitive information

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Website**: SmartPlugBD
- **WhatsApp**: +880 1521 774083
- **Email**: admin@smartplugbd.com

## 🙏 Acknowledgments

- Bootstrap team for the excellent CSS framework
- Font Awesome for the comprehensive icon library
- All contributors and testers

## 📈 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Progressive Web App (PWA) features
- [ ] Payment gateway API integration
- [ ] Email notification system
- [ ] Advanced search with filters
- [ ] Product reviews and ratings system
- [ ] Inventory management system

---

**Built with ❤️ for SmartPlugBD**
