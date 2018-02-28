

   var web3utils =  require('web3-utils');



module.exports =  {


  async init( web3, accountConfig, poolConfig , redisInterface ,testmode  )
  {

    this.web3=web3;
    this.accountConfig =accountConfig;
    this.poolConfig=poolConfig;
    this.redisInterface=redisInterface;
    this.testmode=testmode;
  },

  //most recent
  async getActiveTransactionData(limitAmount)
  {

    var ethereumTransactions = await this.redisInterface.getParsedElementsOfListInRedis('active_transactions_list',limitAmount)

    return ethereumTransactions;


  },

  async getQueuedTransactionData(limitAmount)
  {

    var ethereumTransactionList = await this.redisInterface.getParsedElementsOfListInRedis('queued_transactions', limitAmount)


    return ethereumTransactionList;


  },

  async getSubmittedShares(limitAmount)
  {
    var existingShares = await this.redisInterface.getParsedElementsOfListInRedis('submitted_shares_list',limitAmount)

        console.log(' --- -- - \n \n existingShares',existingShares)

    return existingShares;

  },


  async getSubmittedSolutions(limitAmount)
  {
    var existingSolutions = await this.redisInterface.getParsedElementsOfListInRedis('submitted_solutions_list',limitAmount)


    return existingSolutions;

  },


  getNetworkName()
  {
    if(this.testmode)
    {
      return 'TESTNET'
    }
    return 'MAINNET'
  },


    async getChallengeNumber()
    {
      return this.redisInterface.loadRedisData('challengeNumber')

    },
    async getBlockNumber()
    {
      return this.redisInterface.loadRedisData('ethBlockNumber')

    },

  async getPoolConfig()
  {
    return {
      poolConfig: this.poolConfig,
      AccountAddress: this.accountConfig.address
    }
  },

  async getPoolStats()
  {


    return {
      networkType: this.getNetworkName(),
      ChallengeNumber: await this.getChallengeNumber(),
      blockNumber:  await this.getBlockNumber(),
      TxQueued: await this.loadRedisData('queuedTxCount'),
      TxPending: await this.loadRedisData('pendingTxCount'),
      TxMined: await this.loadRedisData('minedTxCount'),
      TxSuccess: await this.loadRedisData('successTxCount'),
      lastRewardAmount: 0,
      lastRewardEthBlockNumber: 0
    }
  },





}