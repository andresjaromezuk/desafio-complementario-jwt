export function customResponses(req, res, next) {
    res['successfullGet'] = payload => {
      res.status(200).json({
        status: 'success',
        payload
      })
    }

    res['successfullPost'] = payload => {
      res.status(201).json({
        status: 'success',
        payload
      })
    }

    res['successfullPut'] = payload => {
      res.status(200).json({
        status: 'success',
        payload
      })
    }

    res['successfullDelete'] = () => {
      res.status(204).json({
        status: 'success'
      })
    }

    res['successfullLogout'] =  () => {
        res.json({
            status: 'success',
            message: 'logout OK'
          })
      }
      
    next()
  }
  