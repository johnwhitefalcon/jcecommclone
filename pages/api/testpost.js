
export default async function handler(req, res) {

  if (req.method === 'POST') {   
    
 
     const red = req.body; 
      
    
 
     const one = res.status(200).json(red)
     console.log(red)
  
     }
 }
   
