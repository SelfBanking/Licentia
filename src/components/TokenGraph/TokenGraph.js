import React, {useEffect} from 'react'
import {} from '@material-ui/core'
import {} from '@material-ui/icons'
import {} from '@material-ui/styles'


const TokenGraph = React.memo(props => {
    const graphRef = React.createRef();
    const urlEth = new URL('https://www.tradingview.com/symbols/COINBASE-ETHUSD/')
    const urlLink = new URL('https://www.tradingview.com/symbols/BITTREX-LINKUSD/')
    useEffect(() => {

        const appendScript = async ()=>{
            try {
                const scriptLoad = document.createElement('script')
                scriptLoad.src = 'https://s3.tradingview.com/tv.js'
                graphRef.current.appendChild(scriptLoad)
                await(500)
              }
              catch (err) {
                console.log('error loading tradeview script', err);
              }
        }
    
        appendScript()
        console.log('appedScript executed first')
    })

    useEffect(()=>{
        const appendTradeviewGraph = async ()=>{
            try {
                const script = document.createElement('script')
                script.async = true
                let jsonValue =JSON.stringify({
                        "symbols": [
                        [
                            "COINBASE:ETHUSD|12m"
                        ],
                        [
                            "BITTREX:LINKUSD|12m"
                        ]
                        ],
                        "chartOnly": false,
                        "width": 1000,
                        "height": 400,
                        "locale": "en",
                        "colorTheme": "light",
                        "gridLineColor": "#F0F3FA",
                        "trendLineColor": "#2196F3",
                        "fontColor": "rgba(242, 242, 242, 1)",
                        "underLineColor": "#E3F2FD",
                        "isTransparent": true,
                        "autosize": false,
                        "container_id": "tradingview_50dcc"
                    })
                    script.innerHTML = 'TradingView.MediumWidget('+jsonValue+')'
                    graphRef.current.appendChild(script)
              }
              catch (err) {
                console.log('error loading tradeview graph', err);
              }
        }
        appendTradeviewGraph()
        console.log('tradeview graph executed second')
    })
  
    return (
        <div className="tradingview-widget-container" ref={graphRef}>
            <div id="tradingview_50dcc"></div>
            <div className="tradingview-widget-copyright">
                <a href={urlEth} rel="noopener" target="_blank">
                <span className="blue-text">ETHUSD</span></a>
                <span className="blue-text"> | </span>
                <a href={urlLink} rel="noopener" target="_blank">
                <span className="blue-text">LINKUSD</span></a> 
            </div>
        </div>
    )
})


export default TokenGraph
// <!-- TradingView Widget BEGIN -->
// <div class="tradingview-widget-container">
//   <div id="tradingview_50dcc"></div>
//   <div class="tradingview-widget-copyright">
//   <a href="https://www.tradingview.com/symbols/COINBASE-ETHUSD/" rel="noopener" target="_blank">
//   <span class="blue-text">ETHUSD</span></a> <span class="blue-text">and</span> 
//   <a href="https://www.tradingview.com/symbols/BITTREX-LINKUSD/" rel="noopener" target="_blank">
//   <span class="blue-text">LINKUSD Quotes</span></a> by TradingView</div>
//   <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
//   <script type="text/javascript">
//   new TradingView.MediumWidget(
//   {
//   "symbols": [
//     [
//       "COINBASE:ETHUSD|12m"
//     ],
//     [
//       "BITTREX:LINKUSD|12m"
//     ]
//   ],
//   "chartOnly": false,
//   "width": 1000,
//   "height": 400,
//   "locale": "en",
//   "colorTheme": "light",
//   "gridLineColor": "#F0F3FA",
//   "trendLineColor": "#2196F3",
//   "fontColor": "rgba(242, 242, 242, 1)",
//   "underLineColor": "#E3F2FD",
//   "isTransparent": true,
//   "autosize": false,
//   "container_id": "tradingview_50dcc"
// }
//   );
//   </script>
// </div>
// <!-- TradingView Widget END -->

