import { describe, expect, it } from 'vitest';
import { loadConfig } from './config.js';

describe('loadConfig', () => {
  it('usa los valores por defecto si el entorno está vacío', () => {
    const env = {};

    const config = loadConfig(env);

    expect(config).toEqual({ HOST: '0.0.0.0', PORT: 3000 });
  });

  it('convierte PORT de texto a número', () => {
    const env = { PORT: '8080' };

    const config = loadConfig(env);

    expect(config.PORT).toBe(8080);
  });

  it('arroja error si el puerto no es un número válido', () => {
    const env = { PORT: 'abc' };

    expect(() => loadConfig(env)).toThrow();
  });
});
