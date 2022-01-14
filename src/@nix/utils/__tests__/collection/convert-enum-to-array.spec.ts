import { convertEnumToArray } from '../../objects.utils';

/**
 * Tests the convertEnumToArray function.
 * */

describe( 'Tests if convertEnumToArray works', () => {

  it( 'Should return an array', () => {
    enum PaymentType {
      CASH,
      CREDIT_CARD,
      DEBIT_CARD,
      B_KASH,
      ROCKET,
      PAYPAL
    }

    const result = convertEnumToArray( PaymentType );
    expect( result ).toBeInstanceOf( Array );
  } );

  it( 'Should return an array with the correct length', () => {
    enum PaymentType {
      CASH,
      CREDIT_CARD,
      DEBIT_CARD,
      B_KASH,
      ROCKET,
      PAYPAL
    }

    const result = convertEnumToArray( PaymentType );
    expect( result.length ).toBe( 6 );
  } );

  it( 'Should return an array with the correct values', () => {
    enum PaymentType {
      CASH = 2,
      CREDIT_CARD,
      DEBIT_CARD,
      B_KASH,
      ROCKET,
      PAYPAL
    }

    const result: any[] = convertEnumToArray( PaymentType );
    expect( result[3].id ).toEqual( 5 );
  } );

  it( 'Should return an array with the correct values', () => {
    enum PaymentType {
      CASH = 'Cash',
      CREDIT_CARD = 'Credit Card',
      DEBIT_CARD = 'Debit Card',
      B_KASH = 'bKash',
      ROCKET = 'Rocket',
      PAYPAL = 'Paypal'
    }

    const result: any[] = convertEnumToArray( PaymentType );
    expect( result[3].id ).toEqual( 'bKash' );
  } );

  it( 'Should return an array with the correct values', () => {
    enum PaymentType {
      CASH = 'Cash',
      CREDIT_CARD = 'Credit Card',
      DEBIT_CARD = 'Debit Card',
      B_KASH = 'bKash',
      ROCKET = 'Rocket',
      PAYPAL = 'Paypal'
    }

    const result: any[] = convertEnumToArray( PaymentType, 'name', 'type' );
    expect( result[3].name ).toEqual( 'bKash' );
  } );
} );
