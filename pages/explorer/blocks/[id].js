import fromnow from 'fromnow'
import Header from '../../../components/Header'
import instance from '../../../util/axios'
import { useRouter } from 'next/router'
import { ArrowRightIcon } from '@heroicons/react/outline'

export default function Block({ data }) {
  
  const router = useRouter()
  const { id } = router.query

  console.log(data.transactions)

  return (
    <div className="min-h-screen bg-white">
      <div>
        <Header left isExplorer/>
        {/* {transactions.slice(0,8).map(tx => <div key={tx.hash} className="px-4 py-3 mt-2 mb-2 text-sm text-gray-600 break-all bg-gray-200 rounded-lg">
                Hash : {tx.hash}
                </div>) } */}


        <div className="container mb-20">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-gray-800">Block #{id}</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Information of this block</span>

            <div className="flex mt-4">
              <div className="text-gray-600" style={{ width: "20%" }}>Height : </div>
              <div className="text-gray-800">{data.index}</div>
            </div>

            <div className="flex mt-2">
              <div className="text-gray-600" style={{ width: "20%" }}>Nonce : </div>
              <div className="text-gray-800">{data.nonce}</div>
            </div>

            <div className="flex mt-2">
              <div className="text-gray-600" style={{ width: "20%" }}>Time : </div>
              <div className="text-gray-800">{fromnow(data.timestamp * 1000)}</div>
            </div>

           

            <div className="flex mt-2">
              <div className="text-gray-600" style={{ width: "20%" }}>Transactions : </div>
              <div className="text-gray-800">{data.transactions.length}</div>
            </div>

            <div className="flex mt-2">
              <div className="text-gray-600" style={{ width: "20%" }}>Hash : </div>
              <div className="text-gray-800">{data.hash}</div>
            </div>

            <div className="flex mt-2">
              <div className="text-gray-600" style={{ width: "20%" }}>Previous Hash : </div>
              <div className="text-gray-800">{data.previousHash}</div>
            </div>


            <span className="mt-8 text-xl font-medium text-gray-700">Transactions of this block</span>
            {data.transactions.length > 0 && data.transactions.map((tx,index) => <div key={tx.hash} className="flex flex-col w-full px-4 py-2 mt-3 rounded-md hover:bg-gray-100">
                <div className="flex items-center"><span className={`px-5 py-2 mr-2 text-white capitalize ${tx.type === 'reward' ? 'bg-green-600' : tx.type === 'fee' ? 'bg-yellow-600' : 'bg-gray-600'} rounded`}>{tx.type}</span> Transaction #{index+1}</div>
                <div className="mt-2">Hash: {tx.hash}</div>
                <div className="mt-2">Time: {fromnow(tx.hash)}</div>
                
                <div className="flex w-full mt-2">
                  <div className="flex flex-col flex-1">
                    {tx.data.inputs.map(txin => <div className="flex w-full">

                      <div className="truncate">{txin.address || "COINBASE ( NEW GENERATED COIN)"}</div>
                      <div className="self-end flex-shrink-0 ml-auto">{txin.amount}</div>
                    </div>)}

                    {tx.data.inputs.length === 0 && <div className="text-green-500 truncate">{"COINBASE ( NEW GENERATED COIN)"}</div>
                     
                  }
                    
                  </div>  

                  <ArrowRightIcon className="self-center w-8 h-8 mx-5 text-blue-600" />
                  <div className="flex flex-col flex-1">
                    {tx.data.outputs.map(txin => <div className="flex w-full">

                      <div className="truncate">{txin.address}</div>
                      <div className="self-end flex-shrink-0 ml-auto">{txin.amount}</div>
                    </div>)}
                    
                  </div>  
               </div>
                  
            </div>)}
            {/* 
            <div className="flex w-full mt-6">
              <div className="text-sm text-gray-500" style={{ width: "18%" }}>Height</div>
              <div className="text-sm text-gray-500" style={{ width: "25%" }}>Mined</div>
              <div className="text-sm text-gray-500" style={{ width: "40%" }}>Miner</div>
              <div className="text-sm text-gray-500" style={{ width: "17%" }}>Nonce</div>
            </div>

           
          </div>
          <div className="flex flex-col mb-16 mt-26">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-gray-800">Latest Transactions</span>
              <button className="px-4 py-1 text-blue-600 border border-gray-300 rounded-lg">View All</button>
            </div>
            <span className="text-sm font-medium text-gray-600">The most recently published unconfirmed transactions</span>
            <div className="flex w-full mt-6">
              <div className="text-sm text-gray-500" style={{ width: "40%" }}>Hash</div>
              <div className="text-sm text-gray-500" style={{ width: "25%" }}>Time</div>
              <div className="text-sm text-gray-500" style={{ width: "25%" }}>Amount</div>
              <div className="text-sm text-gray-500" style={{ width: "10%" }}>Type</div>
            </div>

            {transactions?.length > 0 && transactions.map(tx => <div key={tx.id} className="flex w-full mt-6">
              <div className="pr-2 text-sm text-gray-800 break-all" style={{ width: "40%" }}>{tx.hash}</div>
              <div className="text-sm text-gray-800" style={{ width: "25%" }}>{fromnow(Number(tx.time) * 1000)}</div>
              <div className="text-sm text-gray-800 break-all" style={{ width: "25%" }}>{tx.data.inputs.reduce((prev, cur) => prev.amount > Number(cur.amount) ? prev : cur, {amount: 0}).amount}</div>
              <div className="text-sm text-gray-800" style={{ width: "10%" }}>{tx.type}</div>
            </div>)} */}
          </div>
        </div>
      </div>
    </div>
  )
}


// Explorer.getInitialProps = async () => {
//   const { data } = await instance.get('blockchain/blocks')
//   const {data : tdata} = await instance.get('blockchain/transactions')

//   return { blocks: data.slice(Math.max(data.length - 8, 0)).reverse(), transactions :  tdata.slice(Math.max(tdata.length - 8, 0)).reverse()}
// }


Block.getInitialProps = async (ctx) => {
  console.log(ctx)
  const { data } = await instance.get('blockchain/blocks/' + ctx.query.id)
  return { data }
}