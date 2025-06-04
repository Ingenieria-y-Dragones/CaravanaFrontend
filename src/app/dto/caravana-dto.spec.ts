import { CaravanaDto } from './caravana-dto';
import { CiudadDto } from './ciudad-dto';

describe('CaravanaDto', () => {
  it('should create an instance', () => {
    const ciudad = new CiudadDto(1, 'Valdruna', 5);
    const caravana = new CaravanaDto(1, 'Caravana A', 10, 100, 200, 50, true, 120, ciudad);
    expect(caravana).toBeTruthy();
  });
});

