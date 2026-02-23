export declare class ApiService {
    protected baseUrl: string;
    get<T>(endpoint: string): Promise<T>;
    getOne<T>(endpoint: string): Promise<T>;
    post<T>(endpoint: string, data: any): Promise<T>;
    put<T>(endpoint: string, data: any): Promise<T>;
}
//# sourceMappingURL=ApiService.d.ts.map