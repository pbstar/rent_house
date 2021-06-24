import axios from 'axios'
export const getCurrentCity = () => {
  const localCity = JSON.parse(sessionStorage.getItem('local'))
  if (!localCity) {
    const geolocation = new window.BMapGL.Geolocation();
    return new Promise((resolve, reject) => {
      try {
        geolocation.getCurrentPosition(async function (r) {
          if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
            // console.log(r);
            const res = await axios.get('http://localhost:3300/area/info', {
              params: {
                name: r.address.city
              }
            })
            sessionStorage.setItem('local', JSON.stringify(res.data.body))
            resolve(res.data.body)
          }
        });
      } catch (err) {
        reject(err)
      }

    })

  }
  else {
    return localCity
  }

}
