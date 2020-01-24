function setEnvByCommandLine() {
  for (var i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    const match = /--env\.(\w+)=(\S+)/g.exec(arg);

    if (!match) continue;

    process.env[match[1]] = match[2];
  }
}

setEnvByCommandLine();