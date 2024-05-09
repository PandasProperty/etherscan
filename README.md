## Home Assigment

# Gas Price Tracker challenge

Display gas prices from Etherscan and update every 10 seconds.

[Check it on vercel](https://etherscan-five.vercel.app/)

I've chose to not use any state management solution, firstly because there wasn't a need (I could have gone for redux, to store the data in a graphql store with the client directive), but secondly, because a state management has some build-ins that don't need to be tested, and I wanted to show more strategies in the automated testing area.

As you can see, from mocking requests in case of success or error, to mocking and testing custom hooks, I've covered the code.

I went for a simple React and TailwindCSS solution in a NextJS project.

--------------------------|---------|----------|---------|---------|-------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------|---------|----------|---------|---------|-------------------
All files                 |     100 |      100 |     100 |     100 |                   
 app                      |     100 |      100 |     100 |     100 |                   
  page.tsx                |     100 |      100 |     100 |     100 |                   
 components/alert         |     100 |      100 |     100 |     100 |                   
  Alert.tsx               |     100 |      100 |     100 |     100 |                   
  index.ts                |     100 |      100 |     100 |     100 |                   
 components/spinner       |     100 |      100 |     100 |     100 |                   
  Spinner.tsx             |     100 |      100 |     100 |     100 |                   
  index.ts                |     100 |      100 |     100 |     100 |                   
 hooks                    |     100 |      100 |     100 |     100 |                   
  usePollingEtherPrice.ts |     100 |      100 |     100 |     100 |                   
  usePollingGasPrices.ts  |     100 |      100 |     100 |     100 |                   
 services                 |     100 |      100 |     100 |     100 |                   
  index.ts                |     100 |      100 |     100 |     100 |                   
 tests                    |     100 |      100 |     100 |     100 |                   
  dataTestIds.ts          |     100 |      100 |     100 |     100 |                   
  mocks.ts                |     100 |      100 |     100 |     100 |                   
 utils                    |     100 |      100 |     100 |     100 |                   
  constants.ts            |     100 |      100 |     100 |     100 |                   
--------------------------|---------|----------|---------|---------|-------------------
