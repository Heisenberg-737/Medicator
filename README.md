# MediCator
Blockchain based pharmaceuticals tracking application.

![Screenshot (381)](https://user-images.githubusercontent.com/55024919/164076342-adbdcba0-31f5-4e53-870e-8a28179aec2e.png)

## Problem It Solves 🎯

- In this pandemic era, healthcare products have gained immense significance in the lives of humans. However, it pains to know that around 10% of the global pharmaceutical commerce worth an estimated $21 billion involves counterfeit drugs.
- A WHO study revealed that nearly one half of the documented cases of drug counterfeiting were reported in developing countries like India, The Philippines, China and Vietnam.
- In 2009, The Central Drug Standards Control Organisation (CDSCO) announced that out of 24,000 samples collected from all over India only 0.046% were fake.
However, in 2017 a similar survey found 3.16% of the medicines sampled were substandard and 0.0245% were fake.

So, in our country, even if we spend huge sums of money on buying healthcare products to alleviate our sufferings, we can’t be sure whether the product is genuine or not.
So we developed an authentication platform for the pharmaceuticals industry, to ensure that counterfeited health products don't make it to the end user.

## Solution ⌛

Our Blockchain application caters to three types of users- the Manufacturers, the Retailers, and the Public. It has signup and login options for retailer and manufacturers whereas the general public can use it without any signing up. Following are the steps and functionalities for each type of user-

#### Manufacturers

The manufacturer can introduce /create new product shipments into the blockchain and create a QR code of the medicine Id, which is then attached to the batch of medicine to be shipped. This QR code is then scanned by the retailers and consumers to check the medicine's authenticity.

#### Retailer/Hospitals

The retailer/hospital will scan the medicine using the QR code scanner on our web or the mobile application and his details like name, date and location will automatically be updated on the blockchain.

#### General Public

The consumer will scan the QR code and get the name of the medicine, it's MRP along with its the manufacture and expiry date. He/she will get the record of all the retailers' locations it has been through. This same interface can be used to determine where the chain has been broken in case of issues such as theft/ counterfeiting of drugs and the responsible party can be easily apprehended. 

## Implementation ⚡

We are implementing a program which uses the Blockchain technology and deploying it using Ethereum network. In this project, we are using blockchain as a decentralised ledger that uses hashing and peer to peer networks to store transactions. Our transactions are secure as there are no third parties involved, with all the transactions carried out by smart contracts automatically. This database is distributed among various nodes, therefore making it virtually impossible for any individual party to hack a blockchain, as to accomplish this he/she needs to have a tremendous computing power(of the order of a supercomputer).

## Technologies Used 🔥

- Blockchain
- Solidity
- Ethereum
- Ganache CLI
- Remix IDE
- Flask
- React.js
- SQLite3
- Flutter

## Problem We Ran Into 🤧

- While implementing the QR code scanner, the main problem we encountered was that it was always refreshing after each scan. So we took a step forward and implemented a single-shot capture.
- Another problem we faced was how to link the solidity program of the blockchain to the front-end and the back-end of the project, which we solved using web3 python library.

## Business Model 🖥️

- We aim at building a self sustaining business model which will work without external donations or funding.
- Addition ad revenue oppurtunity provided by firebase analytics which will propotionately sustain database costs as our user base expands.
- Minimal Fee: Every manufacturer adopting our PWA, will pay a minimal periodic fee in Ethereum Crypto Currency.

## Future Roadmap 🤸

- We have plans to convert our web application to other regional languages to ensure easier UI for using our system.
- We wish to add features to make our PWA accessible to the visually impaired community by integrating visual modules
