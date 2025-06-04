import { JugadorDto } from './jugador-dto';

describe('JugadorDto', () => {
  it('should create an instance', () => {
    const jugador = new JugadorDto(1, 'Alice', 'Explorador', 'alice@example.com');
    expect(jugador).toBeTruthy();
  });
});

