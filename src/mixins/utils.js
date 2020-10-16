const utils = {

    methods:{
         /**Generator password ramdon*/
    $password_generator(){
        let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ23467890@";
        let contraseña = "";
        for (let i=0; i<8; i++) contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
        return contraseña;
    },

    /**Alerts */
    $showAlertConfirm(title, text) {
    return new Promise((resolve, reject) => {
        this.Swal.fire({
          title,
          text,
          type: 'info',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          cancelButtonColor: 'red'
        })
          .then(result => {
            // eslint-disable-next-line no-prototype-builtins
            if (result.hasOwnProperty('value')) {
              resolve(true)
            } else {
              resolve(false)
            }
            // eslint-disable-next-line prefer-promise-reject-errors
          })
          .catch(err => reject({ error: err }))
      })
    },
    $showInfoSuccessNotify() {
        const Toast = this.Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          type: 'success'
        })
  
        Toast.fire({
          type: 'success',
          title: 'Successful operation'
        })
      },
    }

   

}

export default utils
