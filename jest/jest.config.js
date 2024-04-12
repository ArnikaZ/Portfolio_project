module.exports = {
  // Opcje konfiguracyjne dla testów
  testEnvironment: 'node', // Określenie środowiska testowego - w tym przypadku node.js
  verbose: true, // Określenie, czy chcesz, aby informacje o testach były wyświetlane w trybie verbose
  setupFilesAfterEnv: ['./jest.setup.js'], // Ścieżka do pliku konfiguracyjnego, który ma zostać załadowany przed uruchomieniem testów
  // inne opcje konfiguracyjne...
};
