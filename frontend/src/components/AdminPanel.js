// AdminPanel.js
const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      image: '',
      description: ''
    });
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8000/api/products/');
      const data = await response.json();
      setProducts(data);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await fetch('http://localhost:8000/api/products/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        fetchProducts();
        setFormData({ name: '', price: '', image: '', description: '' });
      } catch (error) {
        console.error('Error creating product:', error);
      }
    };
  
    return (
      <div className="admin-panel">
        <h2>Product Management</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <button type="submit">Add Product</button>
        </form>
        
        <div className="product-list-admin">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default AdminPanel;
