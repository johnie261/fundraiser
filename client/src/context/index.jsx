import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import  { ethers } from 'ethers'
import { createContext, useContext } from 'react';

const StateContext = createContext()

export const StateContextProvider = ({children}) => {
    const { contract } = useContract("0xC44Ffa991886FF530e1e1C1C84C073f18490b89b");

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

   const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns')

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),      
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }))

    return parsedCampaigns;
   }

   const getUserCampaigns = async() => {
    const allCampaigns = await getCampaigns()

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns
   } 


   return (
    <StateContext.Provider
       value={{
        address,
        contract,
        createCampaign: publishCampaign,
        connect,
        getCampaigns,
        getUserCampaigns
       }}
    >
      {children}
    </StateContext.Provider>
     
   )
}

export const useStateContext = () => useContext(StateContext)
