class Auction {
  constructor(item, startingPrice) {
    this.item = item;
    this.currentPrice = startingPrice;
    this.bids = [];
    this.isActive = false;
  }

  startAuction() {
    this.isActive = true;
    console.log(`Auction for ${this.item} started with starting price ${this.currentPrice}`);
  }

  placeBid(bidder, amount) {
    if (!this.isActive) {
      console.log(`Auction for ${this.item} is not active.`)
      return;
    }

    if (amount <= this.currentPrice) {
      console.log(`Bid amount should be higher than current price of ${this.currentPrice}.`);
      return;
    }

    this.currentPrice = amount;
    this.bids.push({ bidder, amount });
    console.log(`Bid of ${amount} placed by ${bidder} for ${this.item}. Current price: ${this.currentPrice}`);
  }

  endAuction() {
    this.isActive = false;
    console.log(`Auction for ${this.item} ended.`);
    if (this.bids.length > 0) {
      const winningBid = this.bids[this.bids.length - 1];
      console.log(`Winner: ${winningBid.bidder}, Winning amount: ${winningBid.amount}`);
    } else {
      console.log(`No bids received for ${this.item}.`);
    }
  }
}

let auction;

document.getElementById('create-auction-button').addEventListener('click', (e) => {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const startingPrice = parseFloat(document.getElementById('starting-price').value);
    auction = new Auction(itemName, startingPrice);
    document.getElementById('auction-controls').style.display = 'block';
    document.getElementById('create-auction-form').style.display = 'none';
    updateAuctionStatus();
});

document.getElementById('start-auction-button').addEventListener('click', () => {
    auction.startAuction();
    updateAuctionStatus();
});

document.getElementById('end-auction-button').addEventListener('click', () => {
    auction.endAuction();
    updateAuctionStatus();
});

document.getElementById('place-bid-button').addEventListener('click', (e) => {
    e.preventDefault();
    const bidderName = document.getElementById('bidder-name').value;
    const bidAmount = parseFloat(document.getElementById('bid-amount').value);
    auction.placeBid(bidderName, bidAmount);
    updateAuctionStatus();
});

function updateAuctionStatus() {
    const auctionStatusElement = document.getElementById('auction-status');
    if (auction.isActive) {
        auctionStatusElement.innerText = `Auction is active. Current price: ${auction.currentPrice}`;
    } else {
        auctionStatusElement.innerText = 'Auction is not active.';
    }
    if (auction.bids.length > 0) {
        const winningBid = auction.bids[auction.bids.length - 1];
        auctionStatusElement.innerText += ` Winner: ${winningBid.bidder}, Winning amount: ${winningBid.amount}`;
    }
}
