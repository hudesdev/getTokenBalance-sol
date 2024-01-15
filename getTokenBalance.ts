const mint = new PublicKey("5CY4inXAWEKDENqJ5ZLNaTYX8gzjHZNXimuj7VmFmVi6");

const getTokenBalance = async ({walletAddress, tokenMintAddress}:tokenbalanceType) => {
    const response = await axios({
      url: `https://api.devnet.solana.com`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccountsByOwner",
        params: [
          walletAddress,
          {
            mint: tokenMintAddress,
          },
          {
            encoding: "jsonParsed",
          },
        ],
      },
    });
    if (
      Array.isArray(response?.data?.result?.value) &&
      response?.data?.result?.value?.length > 0 &&
      response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount
        ?.amount > 0
    ) {
      return (
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info
            ?.tokenAmount?.amount
        ) / 1000000000
      );
    } else {
      return 0;
    }
}