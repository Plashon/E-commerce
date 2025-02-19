import { useState, useEffect } from "react";
import ProductService from "../../services/product.service";
import Swal from "sweetalert2";

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
    const formData = new FormData();
    formData.append("name", selectedProduct.name);
    formData.append("description", selectedProduct.description);
    formData.append("price", selectedProduct.price);
    formData.append("category", selectedProduct.category);
    if (selectedProduct.picture instanceof File) {
      formData.append("file", selectedProduct.picture); // Use 'file' if the backend expects 'file'
    }
    try {
      const response = await ProductService.updateProduct(
        selectedProduct._id,
        formData
      );
      const updatedProduct = response.data;
      const updatedProducts = products.map((product) =>
        product._id === selectedProduct._id ? updatedProduct : product
      );
      setProducts(updatedProducts);
      Swal.fire({
        icon: "success",
        title: "Product updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }

    setSelectedProduct(null);
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
          <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
              Edit Product
            </h2>

            <div className="space-y-3">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-gray-600 text-sm">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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
                <label
                  htmlFor="description"
                  className="block text-gray-600 text-sm"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  value={selectedProduct.description}
                  rows={2}
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
                <label htmlFor="price" className="block text-gray-600 text-sm">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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
                <label
                  htmlFor="category"
                  className="block text-gray-600 text-sm"
                >
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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
                <label
                  htmlFor="picture"
                  className="block text-gray-600 text-sm"
                >
                  Picture
                </label>
                <img
                  src={
                    selectedProduct.picture
                      ? URL.createObjectURL(selectedProduct.picture)
                      : selectedProduct.image || "/placeholder-image.jpg"
                  }
                  alt={selectedProduct.name || "Product Image"}
                  className="w-full h-32 object-cover mb-2 rounded-md shadow-sm"
                />

                <input
                  id="picture"
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      picture: e.target.files[0] || selectedProduct.picture,
                    })
                  }
                />
                <label
                  htmlFor="picture"
                  className="cursor-pointer block text-center text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md shadow-md w-full mt-1 text-sm"
                >
                  Upload Image
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="btn btn-outline btn-xs px-4"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary btn-xs px-4"
                onClick={handleSaveChanges}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageItem;
