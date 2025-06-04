import { CiudadDto } from './ciudad-dto';

describe('CiudadDto', () => {
  it('should create an instance', () => {
    const ciudad = new CiudadDto(1, 'Valdruna', 5);
    expect(ciudad).toBeTruthy();
  });
});



