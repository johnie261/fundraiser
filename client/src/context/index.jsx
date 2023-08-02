import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import  { ethers } from 'ethers'
import { createContext, useContext } from 'react';

const StateContext = createContext()

//0xC44Ffa991886FF530e1e1C1C84C073f18490b89b

export const StateContextProvider = ({children}) => {
    const { contract } = useContract("0xC44Ffa991886FF530e1e1C1C84C073f18490b89b");

    console.log(contract)

    const { mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign')

   const address = useAddress();
   const connect = useMetamask()

   const publishCampaign = async(form) => {

    try {

      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
   }


   return (
    <StateContext.Provider
       value={{
        address,
        contract,
        createCampaign: publishCampaign,
        connect
       }}
    >
      {children}
    </StateContext.Provider>
     
   )
}

export const useStateContext = () => useContext(StateContext)
