export interface BirthColumnGroup<T> {
    year: T;
    month: T;
    day: T;
    time: T | null;
}

export interface BirthColumnItem<T, B> {
    gan: T;
    jiji: B;
}
