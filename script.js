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

const auction1 = new Auction("Painting", 100);
auction1.startAuction();
auction1.placeBid("Alice", 150);
auction1.placeBid("Bob", 200);
auction1.endAuction();
