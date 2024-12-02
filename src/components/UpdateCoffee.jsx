import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
    const coffee = useLoaderData();
    const { _id, name, quantity, supplier, taste, category, details, image } = coffee;

    const handleSubmit = e =>{
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const image = form.image.value;

        const updatedCoffee = {name, quantity,supplier,taste,category,details,image};
        // console.log(updatedCoffee);
       // data send to server

       fetch(`https://coffee-store-server-alpha-gules.vercel.app/coffee/${_id}`, {
        method:"PUT",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updatedCoffee)
       })
       .then(res => res.json())
       .then(data => {
        // console.log(data);
        if(data.modifiedCount > 0){
            Swal.fire({
                title: 'Success!',
                text: 'Coffee Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
        }
       })
    }
    return (
        <div className="bg-gray-300 p-24">
            <h2 className="text-3xl font-extrabold mb-10"> Modified Coffee : {name}</h2>
            <form onSubmit={handleSubmit} >
                {/* form name and quantity row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Coffee Name</span>
                        </label>
                        <input type="text" name="name"  defaultValue={name} placeholder="Coffee Name" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control md:w-1/2 md:ml-4">
                        <label className="label">
                            <span className="label-text">Available Quantity</span>
                        </label>
                        <input type="text" name="quantity" defaultValue={quantity} placeholder="Available Quantity" className="input input-bordered w-full" required />
                    </div>

                </div>

                   {/* form Supplier and Taste row */}
                   <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Supplier Name</span>
                        </label>
                        <input type="text" name="supplier" defaultValue={supplier} placeholder="Supplier Name" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control md:w-1/2 md:ml-4">
                        <label className="label">
                            <span className="label-text">Taste</span>
                        </label>
                        <input type="text" name="taste" defaultValue={taste} placeholder="Taste" className="input input-bordered w-full" required />
                    </div>

                </div>

                   {/* form Category and Details row */}
                   <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <input type="text" name="category" defaultValue={category} placeholder="Category" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control md:w-1/2 md:ml-4">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <input type="text" name="details" defaultValue={details} placeholder="Details" className="input input-bordered w-full" required />
                    </div>

                </div>

                   {/* form image url row */}
                   <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image url</span>
                        </label>
                        <input type="text" name="image" defaultValue={image} placeholder="Image url" className="input input-bordered w-full" required />
                    </div>
                </div>
                 <input type="submit" value=" Update Coffee" className="btn btn-block bg-orange-800 text-white hover:bg-orange-700" />
            </form>
        </div>
    );
};

export default UpdateCoffee;