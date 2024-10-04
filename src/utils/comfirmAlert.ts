import Swal from "sweetalert2";

const comfirmAlert = async (func: () => void) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "px-4 py-2 bg-red-400 text-white rounded-xl mx-2",
      cancelButton: "px-4 py-2 bg-sky-400 text-white rounded-xl mx-2",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        func()
      }
    });
};


export default comfirmAlert