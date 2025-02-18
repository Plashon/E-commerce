import { useState, useEffect } from "react";
import ProductService from "../../services/product.service";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const ManageItem = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await ProductService.deleteProductById(id);
        setProducts((prev) => prev.filter((product) => product._id !== id));
        Swal.fire({
          icon: "success",
          title: "Product deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (id) => {
    const product = products.find((product) => product._id === id);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveChanges = async () => {
    // Implement save changes logic here
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">
          Manage Products
        </h1>

        {/* Table for large screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md shadow"
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold">{product.name}</td>
                  <td className="py-3 px-4 truncate max-w-xs">
                    {product.description}
                  </td>
                  <td className="py-3 px-4 font-bold text-green-600">
                    ${product.price}
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="flex items-center gap-2 mt-3">
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-info text-white"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grid view for mobile */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-green-600 font-bold">${product.price}</p>
              <p className="text-gray-500">{product.category}</p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  className="btn btn-sm btn-error text-white px-4"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-info text-white px-4"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Edit Product
            </h2>

            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-gray-600 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-gray-600 font-medium">
                  Description
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-gray-600 font-medium">Price</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              {/* Category Input */}
              <div>
                <label className="block text-gray-600 font-medium">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={selectedProduct.category}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value,
                    })
                  }
                />
              </div>

              {/* Picture Input */}
              <div>
                <label className="block text-gray-600 font-medium">
                  Picture
                </label>
                {selectedProduct.picture && (
                  <img
                    src={URL.createObjectURL(selectedProduct.picture)}
                    alt="Current"
                    className="w-full h-40 object-cover mb-3 rounded-lg"
                  />
                )}
                <input
                  type="file"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      picture: e.target.files[0] || selectedProduct.picture,
                    })
                  }
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 mt-5">
              <button
                className="btn btn-outline btn-sm px-5"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary btn-sm px-5"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageItem;
