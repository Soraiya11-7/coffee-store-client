import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, setCoffees, coffees }) => {

    const { _id, name, quantity, supplier, taste, category, details, image } = coffee;

    const handleDelete = (_id) => {
        console.log(_id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/coffee/${_id}`,{
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data =>{
                    console.log(data);
                    if(data.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Coffee has been deleted.",
                            icon: "success"
                          });
                          const remaining = coffees.filter(cof => cof._id !== _id);
                          setCoffees(remaining);
                    }
                })    
            }
          });
    }
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure className="mr-3">
                    <img
                        src={image}
                        alt="Movie" />
                </figure>
                <div className="w-full flex text-left justify-between">
                    <div>
                        <h2 className="card-title ">Name: {name}</h2>
                        <p className="">{quantity}</p>
                        <p>{supplier}</p>
                        <p>{taste}</p>
                    </div>
                    <div className="card-actions justify-end">
                        <div className="join join-vertical space-y-3 ">
                            <button className="btn bg-orange-800 text-white">View</button>
                           <Link to={`/updateCoffee/${_id}`}>
                           <button className="btn bg-teal-900 text-white ">Edit</button>
                           </Link>
                            <button
                            onClick={() =>handleDelete(_id)}
                            className="btn bg-rose-700 text-white">X</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CoffeeCard;