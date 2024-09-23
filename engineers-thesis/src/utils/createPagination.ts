function createPagination(): Array<{ start: string, end: string }> {
  const result: Array<{ start: string, end: string }> = [];
  const now = new Date();
  const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), 1);

  const current = new Date(lastYear);

  while (current <= now) {
    const start = new Date(current);
    let end:Date;

    if (current.getMonth() === now.getMonth() && current.getFullYear() === now.getFullYear()) {
      end = now;
    }
    else {
      end = new Date(current.getFullYear(), current.getMonth() + 1, 0);
    }

    const startString = start.toISOString().split('T')[0];
    const endString = end.toISOString().split('T')[0];

    result.push({ start: startString, end: endString });

    current.setMonth(current.getMonth() + 1);
  }

  return result;
}

export default createPagination;