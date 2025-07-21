const forType = {
  sale: 'Sale',
  rent: 'Rent'
}

const propertyType = {
  singleFamily: 'Single Family',
  multiFamily: 'Multi-Family',
  condo: 'Condo',
  townhouse: 'Townhouse',
  manufactured: 'Manufactured',
  apartment: 'Apartment',
  land: 'Land'
}

const livingAreaType = {
  below500: '0 to 500',
  over500to800: '500+ to 800',
  over800to1200: '800+ to 1200',
  over1200to1800: '1200+ to 1800',
  over1800: '1800+'
}

const lotAreaType = {
  below5000: '0 to 5K',
  over5kto10k: '5K+ to 10K',
  over10kto20k: ' 10K+ to 20K',
  over20kto50k: '20K+ to 50K',
  over50kto100k: '50K+ to 100K',
  over100kto1m: '100K+ to 1M',
  over1mto5m: '1M+ to 5M',
  over5mto10m: '5M+ to 10M',
  over10M: '10M+'
}

const listingType = {
  standard: 'Standard',
  newConstruction: 'New Construction',
  foreclosure: ' Foreclosure',
  shortSale: 'Short Sale'
}

const rentCastConstant = {
  propertyType,
  forType,
  livingAreaType,
  lotAreaType,
  listingType
}

export default rentCastConstant
